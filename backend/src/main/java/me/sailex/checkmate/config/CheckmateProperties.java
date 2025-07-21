package me.sailex.checkmate.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Getter
@Setter
@ConfigurationProperties(prefix = "checkmate")
public class CheckmateProperties {

    private String version;
    private int sessionExpiration;

}
