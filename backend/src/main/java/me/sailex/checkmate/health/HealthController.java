package me.sailex.checkmate.health;

import me.sailex.checkmate.config.CheckmateProperties;
import me.sailex.checkmate.health.model.Health;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Timestamp;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class HealthController {

    private final CheckmateProperties properties;

    public HealthController(CheckmateProperties properties) {
        this.properties = properties;
    }

    @GetMapping("/health")
    public ResponseEntity<Health> getHealth() {
        String version = properties.getVersion();
        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        return ResponseEntity.ok(new Health(version, timestamp));
    }


}
