import React from 'react';
import CodeLeft from '../components/CodeLeft';
import CodeRight from '../components/CodeRight';
import { SharedStateProvider } from '../components/SharedStateContext';
import Split from '@uiw/react-split';

const Code: React.FC = () => {
    return (
        <SharedStateProvider>
            <h1 className="pt-20">
                Write a program to calculate the factorial of a number. The first line of the input contains a single integer T denoting the number of test cases. Each of the following T lines contain an integer n, for which you need to calculate the factorial.
            </h1>
            <Split style={{ height: '100%', width: '100%', border: '1px solid #d5d5d5', borderRadius: 3 }}>
            <div style={{width:'50%'}}>
                <CodeLeft />
            </div>
            <div style={{width:'50%'}}>
                <CodeRight />
            </div>
            </Split>
        </SharedStateProvider>
    );
};

export default Code;
