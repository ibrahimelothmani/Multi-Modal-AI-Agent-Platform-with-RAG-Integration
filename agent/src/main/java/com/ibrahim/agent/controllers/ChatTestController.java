package com.ibrahim.agent.controllers;

import dev.langchain4j.model.chat.ChatLanguageModel;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")

public class ChatTestController {

    private final ChatLanguageModel chatLanguageModel;

    public ChatTestController(ChatLanguageModel chatLanguageModel) {
        this.chatLanguageModel = chatLanguageModel;
    }

    @GetMapping("/chat")
    public String chat(@RequestParam(defaultValue = "Hello") String question){
        return chatLanguageModel.chat(question);
    }
}