import React, {useState} from 'react';
import './App.css';
import SectionHeader from "./SectionHeader";
import SelectTask from "./SelectTask";

import './Section.css'
import DescribeTask from "./DescribeTask";
import Requirement from "./Requirement";
import SetupTask from "./SetupTask";
import Button from "@material-ui/core/Button";

export const Context = React.createContext({});

function App() {

    const [taskSetting, setTaskSettings] = useState({

        type: '',
        title: '',
        description: '',
        date: '',
        question: '',
        option1: '',
        option2: '',
        option3: '',
        require: '',
        reward: '',
        number: '',
        picBase64: ''

    });

    const [fileName, setFileName] = useState('');

    const handleClick = () => {
        fetch('http://localhost:8080/adding_task', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                type: taskSetting.type,
                title: taskSetting.title,
                description: taskSetting.description,
                date: taskSetting.date,
                question: taskSetting.question,
                option1: taskSetting.option1,
                option2: taskSetting.option2,
                option3: taskSetting.option3,
                require: taskSetting.require,
                reward: taskSetting.reward,
                number: taskSetting.number,
                picBase64: taskSetting.picBase64
            })
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(err => {
                console.log(err)
            })
    };

    return (
        <Context.Provider value={[taskSetting, setTaskSettings]}>
            <div className={'Frame'}>
                <SectionHeader
                  text = 'New Requester Task'
                />
                <SelectTask
                  text = 'Select Task Type'
                />
                <SectionHeader
                    text = 'Describe Your Task to Workers'
                />
                <DescribeTask
                    title = 'Title'
                    description = 'Description'
                    date = 'Expiry Date'
                />
                <SectionHeader
                    text = 'Setting Up Your Task'
                />
                <SetupTask
                    description = 'Before Setup Your Work, Please Choose A Task Type'
                    setFileName = {setFileName}
                />
                <SectionHeader
                    text = 'Worker Requirement'
                />
                <Requirement
                    require = 'Require Master Workers'
                    reward = 'Reward Per Response'
                    number = 'Number Of Workers'
                />
                <div className={'Button'} style={{textAlign: 'center'}}>
                    <Button variant="contained" onClick={handleClick}><h3>Save and Submit</h3></Button>
                </div>
            </div>
        </Context.Provider>
    );
}

export default App;
