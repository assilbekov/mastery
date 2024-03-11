import { unstable_noStore as noStore } from "next/cache";
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import { api } from "~/trpc/server";
import { Skills } from "./_components/Skills";
import { UserButton } from "@clerk/nextjs";

export default async function Page() {
  noStore();

  const [skills, timeBlocks] = await Promise.all([
    api.skill.getAllByUserId.query(),
    api.timeBlock.getAllByUserId.query(),
  ]);

  return (
    <div>
      <div className="flex justify-between items-center border-b px-4 py-3">
        <h3 className="text-2xl font-semibold">Mastery</h3>
        <UserButton />
      </div>
      <Skills initialSkills={skills} initialTimeBlocks={timeBlocks} />
    </div>
  );
}
