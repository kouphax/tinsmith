name := "tinsmith"

version := "0.0.10"

libraryDependencies ++= Seq(
  "org.scala-lang" % "scala-compiler" % "2.10.3",
  "org.scalautils" % "scalautils_2.10" % "2.0",
  "com.github.theon" %% "scala-uri" % "0.3.6"
)

play.Project.playScalaSettings
