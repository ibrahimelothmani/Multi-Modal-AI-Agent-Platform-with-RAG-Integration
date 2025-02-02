package com.ibrahim.agent;

import com.ibrahim.agent.entities.TransactionStatus;
import com.ibrahim.agent.entities.TransactionType;
import com.ibrahim.agent.repositories.TransactionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.Date;
import java.util.List;

@SpringBootApplication
public class Transaction {

    private final static Logger logger = LoggerFactory.getLogger(Transaction.class);

    public static void main(String[] args) {
        SpringApplication.run(Transaction.class, args);
        logger.info("Transaction service started");
    }

    @Bean
    CommandLineRunner commandLineRunner(TransactionRepository transactionRepository) {
        return args -> {
            List<Long> accounts = List.of(11L, 22L, 33L);
            accounts.forEach(accountId -> {
                for (TransactionType type : TransactionType.values()) {
                    for (int i = 0; i < 3; i++) {
                        com.ibrahim.agent.entities.Transaction transaction = com.ibrahim.agent.entities.Transaction
                                .builder()
                                .accountId(accountId)
                                .type(type)
                                .amount(1000 + Math.random() * 70000)
                                .date(new Date())
                                .status(TransactionStatus.PENDING)
                                .build();
                        transactionRepository.save(transaction);
                    }
                }
            });
        };
    }

}
