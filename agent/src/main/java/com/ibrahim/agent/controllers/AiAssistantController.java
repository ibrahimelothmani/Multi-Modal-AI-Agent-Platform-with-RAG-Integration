package com.ibrahim.agent.controllers;

import com.ibrahim.agent.agents.TransactionAiAgent;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

@RestController
@CrossOrigin("*")

public class AiAssistantController {

    private final TransactionAiAgent transactionAiAgent;

    public AiAssistantController(TransactionAiAgent transactionAiAgent) {
        this.transactionAiAgent = transactionAiAgent;
    }

    @GetMapping("/askAgent")
    public Flux<String> chat(@RequestParam(defaultValue = "Hello") String question){
        return transactionAiAgent.chat(question);
    }
}