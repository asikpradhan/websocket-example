import React, {useState} from "react";
import SockJS from "sockjs-client";
import Stomp from "stomp-websocket";
import './App.css';

export const App = () => {
    const [draft, setDraft] = useState({});
    const [isConnected, setIsConnected] = useState(false);

    let sockjs = new SockJS("/draft");
    let stompClient = Stomp.over(sockjs);
    const connect = () => {

        stompClient.connect({}, frame => {
            //setConnected(true);
            console.log('Connected: ' + frame);
            setIsConnected(true);
            stompClient.subscribe('/topic/draft', function (draftMessage) {
                console.log(draftMessage);
                setDraft(draftMessage);
            });
            stompClient.send("/app/draft", {}, JSON.stringify({
                title: "test",
                content: "another test"
            }));

        });
    }


    const saveDraft = () => {

        stompClient.send("/app/draft", {}, JSON.stringify({
            ...draft
        }));
    };


    return (
        <div className="App">
            <header className="App-header">
                <label htmlFor="title">Title</label>
                <input type="text" name="title" onChange={event => {
                    setDraft({...draft, title: event.target.value});
                }} value={draft.title}/>

                <label htmlFor="content">Content</label>
                <textarea name="content" onChange={event => {
                    setDraft({...draft, content: event.target.value});
                }} value={draft.content}>

                </textarea>
                <button disabled={isConnected} onClick={connect}>Connect</button>
                <button disabled={!isConnected} onClick={saveDraft}>Save</button>
            </header>
        </div>
    );
}
