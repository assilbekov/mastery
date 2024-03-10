import { InferSelectModel } from "drizzle-orm";
import { RocketIcon } from "lucide-react";
import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { skills } from "~/server/db/schema";
import { SkillForm } from "./_components/SkillForm";

/* const mockSkills: InferSelectModel<typeof skills>[] = [
  {
    id: 1,
    name: "Design",
    userId: "1",
    color: "bg-blue-500",
    icon: "apple",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    name: "Development",
    userId: "1",
    color: "bg-green-500",
    icon: "alarm-clock",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    name: "Marketing",
    userId: "1",
    color: "bg-pink-500",
    icon: "bug",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 4,
    name: "Sales",
    userId: "1",
    color: "bg-yellow-500",
    icon: "cannabis",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 5,
    name: "Customer Support",
    userId: "1",
    color: "bg-red-500",
    icon: "dollar-sign",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 6,
    name: "Human Resources",
    userId: "1",
    color: "bg-indigo-500",
    icon: "git-pull-request",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 7,
    name: "Finance",
    userId: "1",
    color: "bg-purple-500",
    icon: "landmark",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 8,
    name: "Operations",
    userId: "1",
    color: "bg-gray-500",
    icon: "loader",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 9,
    name: "Legal",
    userId: "1",
    color: "bg-yellow-500",
    icon: "person-standing",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
] */

export default async function Page() {
  noStore();
  /* const hello = await api.post.hello.query({ text: "from tRPC" });
  const session = await getServerAuthSession(); */

  return (
    <div>
      <div className="flex justify-between">
        <h3 className="text-2xl font-semibold">Skills</h3>
        <Button size="sm">
          Create Skill
        </Button>
      </div>
      <Alert>
        <RocketIcon className="h-4 w-4" />
        <AlertTitle>No skills created!</AlertTitle>
        <AlertDescription>
          You have nothing to track here. Create your first skill now.
        </AlertDescription>
      </Alert>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* {mockSkills.map((skill) => (
          <Card>
            <CardHeader>
              <CardTitle>{skill.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <div
                  className={`w-4 h-4 rounded-full ${skill.color}`}
                ></div>
                <p className="text-sm text-muted-foreground">
                  {skill.icon}
                </p>
              </div>
            </CardContent>
          </Card>
        ))} */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Revenue
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Subscriptions
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2350</div>
            <p className="text-xs text-muted-foreground">
              +180.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sales</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <path d="M2 10h20" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12,234</div>
            <p className="text-xs text-muted-foreground">
              +19% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Now
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">
              +201 since last hour
            </p>
          </CardContent>
        </Card>
      </div>

      <SkillForm
        //setOpen={() => { }}
        isLoading={false}
        // onSubmit={async (values) => { }}
      />
    </div>
  );
}
