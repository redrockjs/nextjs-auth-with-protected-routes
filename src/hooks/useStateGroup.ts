/** This package introduces a custom hook useStateGroup, which helps you define states in your functional components quickly.
 *  Fork from https://www.npmjs.com/package/react-use-state-group
 *
 *  Usage:
 *  import {useStateGroup} from "react-use-state-group";
 *  const [userState, userStateSetters] = useStateGroup({
 *         name: "Jonny",
 *         age: 25,
 *     });
 *
 *  Does the same effect as
 *
 *  import {useState} from 'react';
 *
 *  const [name, setName] = useState("Jonny");
 *  const [age, setAge] = useState(25);
 */

import {useState} from "react";

type Setters<T extends {}> = {
    [K in keyof T]: (value: T[K]) => void
}

export function useStateGroup<T extends {}>(group: T): [T, Setters<T>] {
    const [state, setState] = useState(group);

    const setters = {};
    for (let key of Object.keys(group)) {
        (setters as any)[key] = (value: any) => {
            setState(state => Object.assign({...state}, {[key]: value}));
        }
    }

    return [
        state,
        setters as Setters<T>
    ]
}