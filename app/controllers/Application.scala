package controllers

import play.api.mvc._
import play.api.libs.iteratee.{Concurrent, Iteratee}
import concurrent.ExecutionContext.Implicits.global
import play.api.libs.json.Json
import scala.util.Try
import java.io.{PrintWriter, StringWriter}
import java.lang.reflect.InvocationTargetException

object Application extends Controller {

  import com.github.jedesah.codesheet.api.ScalaCodeSheet

  def index = Action { request =>
    Ok(views.html.index())
  }

  def stream = WebSocket.using[String] { request =>
    val (out, channel) = Concurrent.broadcast[String]
    val in = Iteratee.foreach[String] { input =>

      val startTime = System.nanoTime()
      Try(ScalaCodeSheet.computeResults(input)).map { results =>
        channel.push(Json.obj(
          // TODO Remove the warning message when the code sheet doesn't return it
          "userRepr" -> results.userRepr.replaceAllLiterally("This catches all Throwables. If this is really intended, use `case ex : Throwable` to clear this warning.", ""),
          "output" -> (results.output + "\n" + timeToComplete(startTime))
        ).toString)
      } recover { case failure: InvocationTargetException =>

        val target = failure.getTargetException
        val writer = new StringWriter

        writer.write(target.getMessage + "\n")
        target.printStackTrace(new PrintWriter(writer, true))

        channel.push(Json.obj(
          "userRepr" -> "",
          "output" -> (writer.toString + "\n" + timeToComplete(startTime))
        ).toString)
      }

    }

    (in, out)
  }

  private def timeToComplete(startTime: Long) = "Elapsed time: " + (System.nanoTime() - startTime)/1000000000.0 + "s"
}