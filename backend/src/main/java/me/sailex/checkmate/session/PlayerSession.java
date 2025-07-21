package me.sailex.checkmate.session;

import java.sql.Timestamp;
import java.util.UUID;

public record PlayerSession(
    String username,
    String token,
    Timestamp createdAt
) {
    public PlayerSession(String name) {
        this(name, UUID.randomUUID().toString() + System.currentTimeMillis(), new Timestamp(System.currentTimeMillis()));
    }
}
