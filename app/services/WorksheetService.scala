package services

import java.io.{PrintWriter, StringWriter}
import scala.util.Try
import com.github.jedesah.codesheet.api.ScalaCodeSheet
import play.api.libs.json.Json
import java.lang.reflect.InvocationTargetException

class WorksheetService {

  def evaluate(input: String) = {

    val startTime = System.nanoTime()
    val response = Try(ScalaCodeSheet.computeResults(input)).map { results =>
      Json.obj(
        "userRepr" -> removeCodeSheetWarnings(results.userRepr),
        "output" -> (results.output + "\n" + timeToComplete(startTime))
      )
    } recover { case failure: InvocationTargetException =>
      Json.obj(
        "userRepr" -> "",
        "output" -> (stringifyException(failure.getTargetException) + "\n" + timeToComplete(startTime))
      )
    }

    response.get
  }

  private def timeToComplete(startTime: Long) = {
    "Elapsed time: " + (System.nanoTime() - startTime)/1000000000.0 + "s"
  }

  private def stringifyException(ex: Throwable) = {
    val writer = new StringWriter
    writer.write(ex.getMessage + "\n")
    ex.printStackTrace(new PrintWriter(writer, true))
    writer.toString
  }

  private def removeCodeSheetWarnings(output: String) = {
    // TODO Remove the warning message when the code sheet doesn't return it
    output.replaceAllLiterally("This catches all Throwables. If this is really intended, use `case ex : Throwable` to clear this warning.", "")
  }
}
