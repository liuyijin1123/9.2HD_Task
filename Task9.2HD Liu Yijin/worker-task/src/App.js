import React, {useState} from 'react';
import './App.css';
import SectionHeader from "./SectionHeader";

import './Section.css'
import TaskSection from "./TaskSection";
import VoiceToText from "./VoiceToText";
import VoiceToFile from "./VoiceToFile";




function App() {

  const [filter, setFilter] = useState({
    filterByDate: '365',
    filterByTitle: '',
    deleteByTitle: '',
    delete: '',
    image: ''
  });

  return (
    <Filter.Provider value={[filter, setFilter]}>
      <div className={'Frame'}>
        <SectionHeader
          text = 'Worker Task'
        />
        <TaskSection/>
          <SectionHeader
              text = 'Voice to Text Converter'
          />
          <VoiceToText/>
          <SectionHeader
              text = 'Voice to File Recorder'
          />
          <VoiceToFile/>
      </div>

    </Filter.Provider>
  );
}

export default App;
export const Filter = React.createContext({});
