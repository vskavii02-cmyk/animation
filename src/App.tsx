import { useState } from 'react';
import { AgencySheet, type SheetSelection } from './components/AgencySheet';
import { Hero } from './components/Hero';
import { Navbar } from './components/Navbar';
import { ScrubVideo } from './components/ScrubVideo';

export default function App() {
  const [selection, setSelection] = useState<SheetSelection>(null);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <ScrubVideo />
      <Navbar
        onSelectSection={(section) => setSelection(section)}
        onResetHome={() => setSelection(null)}
      />
      <main>
        <Hero onSelectTopic={(topic) => setSelection(topic)} />
      </main>
      <AgencySheet
        selection={selection}
        onClose={() => setSelection(null)}
      />
    </div>
  );
}
