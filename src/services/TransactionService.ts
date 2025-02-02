import axios from 'axios';

export class TransactionService {

    private API = "http://localhost:8091/";

    async askAgent(question: string): Promise<string> {
      try {
        const response = await axios.get(`${this.API}askAgent?question=${question}`, {
          responseType: 'text',
        });
        return response.data; // Return the response data
      } catch (error) {
        console.error("Error during request:", error);
        throw error; // Rethrow or handle as needed
      }
    }

    // Get transactions
    async getTransactions() {
        try {
            const response = await axios.get(`${this.API}transactions`);
            return response.data;
        } catch (error) {
            console.error("Error getting transactions:", error);
            throw error; // Rethrow or handle as necessary
        }
    }
}
