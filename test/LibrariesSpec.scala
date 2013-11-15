
import org.specs2.mutable._
import org.specs2.runner._
import org.junit.runner._

import play.api.test._
import play.api.test.Helpers._
import services.WorksheetService


@RunWith(classOf[JUnitRunner])
class LibrariesSpec extends Specification {

  "Worksheet" should {

    "have access to ScalaUtils" in {
      val code = """
          |import org.scalautils._
          |import TripleEquals._
          |import StringNormalizations._
          |import Explicitly._
          |
          |("Hello" === "hello") (after being lowerCased)
        """.stripMargin

      val worksheet = new WorksheetService

      (worksheet.evaluate(code) \ "userRepr").as[String] must endWith ("true")
    }
  }
}
