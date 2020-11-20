package com.example;

import com.example.data.DraftRepository;
import com.example.data.entity.Draft;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@RequiredArgsConstructor
public class WebsocketExampleApplication implements CommandLineRunner {

    private final DraftRepository draftRepository;

    public static void main(String[] args) {
        SpringApplication.run(WebsocketExampleApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        Draft draft = new Draft();
        draft.setContent("This is content");
        draft.setKeywords("first");
        draft.setTitle("This is title");
        draftRepository.save(draft);
    }
}
