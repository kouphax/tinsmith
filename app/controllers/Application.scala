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

      Try(ScalaCodeSheet.computeResults(input)).map { results =>
        channel.push(Json.obj(
          "userRepr" -> results.userRepr,
          "output" -> results.output
        ).toString)
      } recover { case failure: InvocationTargetException =>
        val target = failure.getTargetException
        val writer = new StringWriter

        writer.write(target.getMessage + "\n")
        target.printStackTrace(new PrintWriter(writer, true))

        channel.push(Json.obj(
          "userRepr" -> "",
          "output" -> writer.toString
        ).toString)
      }


    }

    (in, out)
  }
}