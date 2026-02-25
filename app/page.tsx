import NavigationBar from "@/components/NavigationBar";
import SearchFilterHero from "@/components/SearchFilterHero";
import CafeList from "@/components/CafeList";
import FloatingActionButton from "@/components/FloatingActionButton";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f5f5f7] pb-24">
      <NavigationBar />
      <SearchFilterHero />
      <div className="container mx-auto max-w-5xl">
        <CafeList />
      </div>
      <FloatingActionButton />
    </main>
  );
}
