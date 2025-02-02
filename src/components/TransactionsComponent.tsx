import React, { useEffect, useState } from 'react';
import { Container, Alert, Table, Spinner } from 'react-bootstrap';
import { TransactionService } from '../services/TransactionService';
import '../css/transaction.css';

interface Transaction {
  id: string;
  date: string;
  accountId: string;
  type: string;
  amount: number;
  status: string;
}

const Transactions: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const transactionService = new TransactionService();
    const fetchTransactions = async () => {
      try {
        const data = await transactionService.getTransactions();
        setTransactions(data);
      } catch (err) {
        setError('Failed to load transactions');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  const getStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'success': return 'success';
      case 'pending': return 'warning';
      case 'failed': return 'danger';
      default: return 'secondary';
    }
  };

  return (
    <Container className="transaction-container">
      <h2 className="my-4">Transaction History</h2>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
          <span className="ms-2">Loading transactions...</span>
        </div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : transactions && transactions.length > 0 ? (
        <div className="table-responsive">
          <Table striped bordered hover className="shadow-sm">
            <thead className="bg-dark text-white">
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Account</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.id}</td>
                  <td>{transaction.date}</td>
                  <td>{transaction.accountId}</td>
                  <td>{transaction.type}</td>
                  <td>${transaction.amount.toFixed(2)}</td>
                  <td>
                    <Alert variant={getStatusVariant(transaction.status)} className="py-1 px-3 m-0 d-inline-block">
                      {transaction.status}
                    </Alert>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ) : (
        <Alert variant="warning">
          <strong>No transactions found!</strong>
        </Alert>
      )}
    </Container>
  );
};

export default Transactions;