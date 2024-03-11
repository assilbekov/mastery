import type { Metadata } from "next"
import Image from "next/image";
import { Container } from "~/components/ui/renamed";
import { Button } from "~/components/ui/button";

import { Label } from "~/components/ui/label";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Master Your Skills with Mastery",
  description: "Track, Analyze, and Improve Your Skills with Ease",
}

export default async function Page() {
  return (
    <div>
      <div className="border-b flex justify-between items-center px-6 py-4">
        <Label className="text-lg font-bold">FPlanner</Label>
        <Link href="/dashboard">
          <Button size="sm" variant="outline">
            Log in
          </Button>
        </Link>
      </div>
      <div className="overflow-hidden py-20 sm:py-32 lg:pb-32 xl:pb-36">
        <Container>
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-8 lg:gap-y-20">
            <div className="relative z-10 mx-auto max-w-2xl lg:col-span-7 lg:max-w-none lg:pt-6 xl:col-span-6">
              <h1 className="text-4xl font-medium tracking-tight text-gray-900">
                Track your progress and master your skills with ease.
              </h1>
              <p className="mt-6 text-lg text-gray-600">
                Log your practice sessions effortlessly and watch your progress grow over time.
                Set personalized goals and celebrate every milestone you reach on your journey to mastery.
                Gain insights into your practice habits with detailed analytics and personalized reports.
                Connect with fellow learners, share your journey, and find inspiration and support.
              </p>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-4">
                <Link href="/dashboard">
                  <Button>
                    Start for free
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative -mt-4 lg:col-span-7 lg:mt-0 xl:col-span-6">
              <Image
                src="/app-screen.png"
                alt=""
                width={400}
                height={800}
                className="pointer-events-none absolute inset-0 w-full"
              />
            </div>
          </div>
        </Container>
      </div>
    </div>
  )
}
