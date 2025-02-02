import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Container, Card, Form, Button, Spinner } from 'react-bootstrap';
import { TransactionService } from '../services/TransactionService';
import '../css/chat.css';

interface ChatUIProps {
  transactionService: TransactionService;
}

const ChatUI: React.FC<ChatUIProps> = ({ transactionService }) => {
  const [question, setQuestion] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const askAgent = async () => {
    setResponse('');
    setIsLoading(true);
    try {
      const res = await transactionService.askAgent(question);
      setResponse(res);
    } catch (err) {
      console.error(err);
      setResponse('Sorry, something went wrong. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="chat-container">
      <Card className="shadow-lg">
        <Card.Header className="bg-primary text-white">
          <h3 className="mb-0">Chat with Agent</h3>
        </Card.Header>
        <Card.Body className="chat-messages">
          {question && (
            <div className="message user-message bg-primary text-white p-3 mb-3 rounded">
              {question}
            </div>
          )}
          {isLoading ? (
            <div className="message agent-message p-3 mb-3 bg-light rounded d-flex align-items-center">
              <Spinner animation="border" variant="primary" className="me-2" />
              <span>Loading...</span>
            </div>
          ) : response ? (
            <div className="message agent-message p-3 mb-3 bg-light rounded">
              <ReactMarkdown>{response}</ReactMarkdown>
            </div>
          ) : null}
        </Card.Body>
        <Card.Footer className="bg-light">
          <Form className="d-flex gap-2">
            <Form.Control
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-grow-1"
            />
            <Button 
              variant="primary" 
              onClick={askAgent}
              disabled={isLoading || !question.trim()}
            >
              Ask Agent
            </Button>
          </Form>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default ChatUI;