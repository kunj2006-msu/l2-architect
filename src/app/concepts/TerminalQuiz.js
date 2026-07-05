'use client';

import { useState, useEffect } from 'react';

export default function TerminalQuiz({ quiz, conceptTitle, onStateChange }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  useEffect(() => {
    if (onStateChange) {
      onStateChange(quizStarted && !quizComplete);
    }
    return () => {
      if (onStateChange) {
        onStateChange(false);
      }
    };
  }, [quizStarted, quizComplete, onStateChange]);

  if (!quiz || quiz.length === 0) {
    return (
      <div className="terminal-quiz-container">
        <div className="terminal-quiz-header">&gt; SYSTEM_DIAGNOSTICS_CHECK // ERROR</div>
        <div className="terminal-quiz-body">No diagnostics available.</div>
      </div>
    );
  }
  if (!quizStarted) {
    return (
      <div className="terminal-quiz-container start-screen">
        <div className="terminal-quiz-header">
          &gt; SYSTEM_DIAGNOSTICS_CHECK // READY
        </div>
        <div className="terminal-quiz-body start-view">
          <div className="terminal-info-text">
            &gt; SECURE_CONNECTION_ESTABLISHED.
          </div>
          <div className="terminal-info-text">
            &gt; DIAGNOSTICS READY FOR: {conceptTitle ? conceptTitle.toUpperCase() : "MODULE"}.
          </div>
          <div className="terminal-quiz-actions" style={{ marginTop: '1.5rem' }}>
            <button
              className="terminal-quiz-action-btn start-btn"
              onClick={() => setQuizStarted(true)}
              type="button"
            >
              [ START_QUIZ ]
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = quiz[currentQuestionIndex];

  const handleOptionClick = (idx) => {
    if (isSubmitted) return;
    setSelectedOptionIndex(idx);
  };

  const handleSubmit = () => {
    if (selectedOptionIndex === null || isSubmitted) return;
    
    setIsSubmitted(true);
    if (selectedOptionIndex === currentQuestion.correctAnswerIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex + 1 < quiz.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOptionIndex(null);
      setIsSubmitted(false);
    } else {
      setQuizComplete(true);
    }
  };

  const handleReboot = () => {
    setCurrentQuestionIndex(0);
    setSelectedOptionIndex(null);
    setIsSubmitted(false);
    setScore(0);
    setQuizComplete(false);
    setQuizStarted(false);
  };

  return (
    <div className="terminal-quiz-container">
      <div className="terminal-quiz-header">
        {quizComplete 
          ? `> SYSTEM_DIAGNOSTICS_CHECK // COMPLETE` 
          : `> SYSTEM_DIAGNOSTICS_CHECK // QUERY 0${currentQuestionIndex + 1}_OF_0${quiz.length}`
        }
      </div>

      {!quizComplete ? (
        <div className="terminal-quiz-body">
          <div className="terminal-quiz-question">
            {currentQuestion.question}
          </div>

          <div className="terminal-quiz-options">
            {currentQuestion.options.map((option, idx) => {
              // Determine classes
              let optionClass = "terminal-quiz-option";
              if (isSubmitted) {
                if (idx === currentQuestion.correctAnswerIndex) {
                  optionClass += " correct";
                } else if (idx === selectedOptionIndex) {
                  optionClass += " incorrect";
                } else {
                  optionClass += " disabled";
                }
              } else if (idx === selectedOptionIndex) {
                optionClass += " selected";
              }

              return (
                <button
                  key={idx}
                  className={optionClass}
                  onClick={() => handleOptionClick(idx)}
                  disabled={isSubmitted}
                  type="button"
                >
                  <span className="option-prefix">
                    {idx === 0 ? "A" : idx === 1 ? "B" : idx === 2 ? "C" : "D"}.
                  </span>
                  <span className="option-text">{option}</span>
                </button>
              );
            })}
          </div>

          {/* Explanation / Result box with height reservation to prevent layout shifts */}
          <div className="terminal-quiz-feedback-wrapper">
            {isSubmitted && (
              <div 
                className={`terminal-quiz-status ${
                  selectedOptionIndex === currentQuestion.correctAnswerIndex ? 'success' : 'error'
                }`}
              >
                {selectedOptionIndex === currentQuestion.correctAnswerIndex ? (
                  <span>
                    &gt; [ STATUS: SUCCESS ] - {currentQuestion.explanation}
                  </span>
                ) : (
                  <span>
                    &gt; [ STATUS: ERROR ] - {currentQuestion.explanation}
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="terminal-quiz-actions">
            {!isSubmitted ? (
              <button
                className="terminal-quiz-action-btn submit-btn"
                onClick={handleSubmit}
                disabled={selectedOptionIndex === null}
                type="button"
              >
                [ SUBMIT_ANSWER ]
              </button>
            ) : (
              <button
                className="terminal-quiz-action-btn next-btn"
                onClick={handleNext}
                type="button"
              >
                [ NEXT_QUERY ]
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="terminal-quiz-body complete-view">
          <div className="diagnostics-complete-text">
            &gt; DIAGNOSTICS COMPLETE
          </div>
          <div className="diagnostics-score-text">
            &gt; FINAL SCORE: {score}/{quiz.length}
          </div>
          
          <div className="terminal-quiz-actions">
            <button
              className="terminal-quiz-action-btn reboot-btn"
              onClick={handleReboot}
              type="button"
            >
              [ REBOOT_SEQUENCE ]
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
