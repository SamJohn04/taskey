import HeroButtons from "./components/HeroButtons";
import Box from "./components/styleComponents/Box";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-12 p-8 md:p-24">
      <Box className="flex flex-col items-center gap-12 py-8 w-[95vw] max-w-5xl">
        <div className="flex flex-col gap-12 py-8 w-full max-w-3xl text-start">
          <h1 className="font-bold text-3xl">Taskey</h1>
          <p className="text-lg">Stay organized, focused, and stylish with Taskey - the ultimate task management app that puts you in control. Effortlessly manage your to-dos while customizing the app to match your unique style and preferences.</p>
          <HeroButtons />
        </div>
      </Box>
    </main>
  );
}
