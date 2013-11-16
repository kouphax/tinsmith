package controllers

import play.api.mvc._
import play.api.libs.iteratee.{Concurrent, Iteratee}
import concurrent.ExecutionContext.Implicits.global
import services.WorksheetService
import play.api.libs.ws.WS
import concurrent._
import com.github.theon.uri.Uri._

object Application extends ApplicationController

class ApplicationController(worksheetService: WorksheetService = new WorksheetService) extends Controller{

  def index = Action.async { request =>
    request.getQueryString("gist").map { gist =>
      for(
        meta <- WS.url(s"https://api.github.com/gists/$gist").get;
        rawUrl <- Future((meta.json \\ "raw_url").head.as[String]);
        raw <- WS.url(rawUrl).get.map(_.body)
      ) yield {
        Ok(views.html.index(Some(raw)))
      }

    } getOrElse future {
      Ok(views.html.index(None))
    }
  }

  def stream = WebSocket.using[String] { request =>
    val (out, channel) = Concurrent.broadcast[String]
    val in = Iteratee.foreach[String] { input =>
      channel.push(worksheetService.evaluate(input).toString)
    }

    (in, out)
  }

}