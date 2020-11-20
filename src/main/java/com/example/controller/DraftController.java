package com.example.controller;


import com.example.data.DraftRepository;
import com.example.data.entity.Draft;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class DraftController {

    private final DraftRepository draftRepository;

    @MessageMapping("/draft/{id}")
    @SendTo("/topic/draft/{id}")
    public Draft draft(Draft draft) {
        return draftRepository.save(draft);
    }
}
