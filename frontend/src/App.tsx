import { HeroSection } from "./components/app-components/dash-board";
import { Navbar } from "./components/app-components/nav-bar";
import { TrendingCourses } from "./components/ui/trending-courses";
import { Layout } from "./components/app-components/layout";

function App() {
  return (
    <div>
      <Navbar />
      <Layout>
        <HeroSection />
        <TrendingCourses />
      </Layout>{" "}
    </div>
  );
}

export default App;
