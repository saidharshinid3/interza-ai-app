import { Router, Route } from "wouter";
import { AppStateProvider } from "@/lib/store";
import { Home } from "@/pages/Home";
import { Setup } from "@/pages/Setup";
import { Interview } from "@/pages/Interview";
import { Feedback } from "@/pages/Feedback";
import NotFound from "@/pages/not-found";

function App() {
  return (
    <AppStateProvider>
      <Router>
        <Route path="/" component={Home} />
        <Route path="/setup" component={Setup} />
        <Route path="/interview" component={Interview} />
        <Route path="/feedback" component={Feedback} />
        <Route path="*" component={NotFound} />
      </Router>
    </AppStateProvider>
  );
}

export default App;
