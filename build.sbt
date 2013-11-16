buildInfoSettings

sourceGenerators in Compile <+= buildInfo

buildInfoKeys := Seq[BuildInfoKey](name, version, scalaVersion, sbtVersion)

buildInfoPackage := "build"

name := "tinsmith"

version := "0.0.11"

libraryDependencies ++= Seq(
  "org.scala-lang" % "scala-compiler" % "2.10.3",
  "org.scalautils" % "scalautils_2.10" % "2.0"
)     

play.Project.playScalaSettings
