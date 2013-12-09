buildInfoSettings

sourceGenerators in Compile <+= buildInfo

buildInfoKeys := Seq[BuildInfoKey](name, version, scalaVersion, sbtVersion)

buildInfoPackage := "build"

name := "tinsmith"

version := "0.0.11"

scalaVersion := "2.10.4-20131126-231426-da7395016c"

bintrayResolverSettings

resolvers ++= Seq(
	bintray.Opts.resolver.repo("masseguillaume", "maven"),
	bintray.Opts.resolver.repo("jedesah", "maven"),
	"Sonatype OSS Snapshots" at "http://oss.sonatype.org/content/repositories/snapshots/"
)

libraryDependencies ++= Seq(
  "org.scala-lang" % "scala-compiler" % "2.10.3",
  "org.scalautils" % "scalautils_2.10" % "2.0",
  "com.github.jedesah" % "scalainsight_2.10.4-20131126-231426-da7395016c" % "1.0.0"
)     

play.Project.playScalaSettings
