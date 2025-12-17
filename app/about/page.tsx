import { Card } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ""

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto max-w-2xl px-4 py-8">
        <Link
          href="/"
          className="mb-6 inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-1 size-4" />
          Back to quiz
        </Link>

        <div className="mb-8 flex items-center gap-3">
          <img src={basePath + "/logo.png"} alt="" className="size-20" />
          <h1 className="text-3xl font-bold">About Wortle</h1>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold">What is Wortle?</h2>
            <p className="text-muted-foreground">
              Wortle is a daily wild plant identification quiz for plants in Britain and Ireland.
              Each day, you&apos;re presented with photographs of a wild plant and challenged
              to identify it by its common or scientific name.
            </p>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold">How to play</h2>
            <ol className="list-inside list-decimal space-y-2 text-muted-foreground">
              <li>Study the photographs carefully - you can zoom and pan to see details</li>
              <li>Use the observation details (location, habitat, date) as clues</li>
              <li>Search for the plant by common name or scientific name</li>
              <li>Submit your answer to see if you&apos;re correct</li>
              <li>Come back tomorrow for a new challenge!</li>
            </ol>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold">Tips for identification</h2>
            <ul className="list-inside list-disc space-y-2 text-muted-foreground">
              <li>Pay attention to flower shape, colour, and arrangement</li>
              <li>Look at leaf shape, margins, and how they attach to the stem</li>
              <li>Consider the habitat - woodland, grassland, wetland, etc.</li>
              <li>The time of year can help narrow down flowering species</li>
              <li>Use the location to consider regional variations</li>
            </ul>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold">About the project</h2>
            <p className="mb-3 text-muted-foreground">
              Wortle was created to help people improve their ID skills and appreciate the wild plants
              of the UK and Ireland. All photographs are sourced from real observations
              and are credited to their photographers.
            </p>
            <p className="text-muted-foreground">
              This is a free community project, owned by everyone. The{" "}
              <a
                href="https://github.com/mdr/wortle-prototype"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground"
              >
                code is open source
              </a>{" "}
              and all images are licensed under Creative Commons licences.
            </p>
          </Card>
        </div>
      </div>
    </main>
  )
}
