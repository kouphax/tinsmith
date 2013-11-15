package controllers

import play.api.mvc._
import play.api.libs.iteratee.{Concurrent, Iteratee}
import concurrent.ExecutionContext.Implicits.global
import services.WorksheetService

object Application extends ApplicationController

class ApplicationController(worksheetService: WorksheetService = new WorksheetService) extends Controller{

  def index = Action { request =>
    Ok(views.html.index())
  }

  def stream = WebSocket.using[String] { request =>
    val (out, channel) = Concurrent.broadcast[String]
    val in = Iteratee.foreach[String] { input =>
      channel.push(worksheetService.evaluate(input).toString)
    }

    (in, out)
  }

}