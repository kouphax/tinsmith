name := "api"

version := "1.0-SNAPSHOT"

libraryDependencies ++= Seq(
  jdbc,
  anorm,
  cache,
  "org.scala-lang" % "scala-compiler" % "2.10.3"
)     

play.Project.playScalaSettings
