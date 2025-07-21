package me.sailex.checkmate.session;

import java.sql.Timestamp;
import java.util.*;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

public class ExpirableList<T> {

    private final Map<Timestamp, T> entries;
    private final int expirationTime;

    public ExpirableList(int expirationTime) {
        this.entries = new HashMap<>();
        this.expirationTime = expirationTime * 1000;
    }

    public void add(T item) {
        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        entries.put(timestamp, item);
    }

    public void expire() {
        if (entries.isEmpty()) {
            return;
        }
        List<Timestamp> toRemove = entries.keySet()
                .stream()
                .filter(timestamp -> System.currentTimeMillis() - timestamp.getTime() > expirationTime)
                .toList();
        toRemove.forEach(entries::remove);
    }

    public Stream<T> stream() {
        Spliterator<T> spliterator = Spliterators.spliterator(entries.values(), 0);
        return StreamSupport.stream(spliterator, false);
    }

}
