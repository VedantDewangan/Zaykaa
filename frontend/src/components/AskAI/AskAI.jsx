import React,{useState} from 'react'
import './AskAI.css'
import { useNavigate } from 'react-router-dom';

export default function AskAI() {
  const navigate = useNavigate();
  return (
    <div className="AI-container">
    <h2>🍽️ Ask AI for <span>Food Recommendations</span></h2>
    <p>Confused about what to order? Not anymore!</p>
    <p>Click below to get a food recommendation based on your mood. 🎉</p>
    <button className="ai-button" onClick={()=>{
      navigate("/ai")
    }} >Get Recommendation</button>
  </div>
  
  );
}
