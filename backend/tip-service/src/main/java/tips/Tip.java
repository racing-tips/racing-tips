package tips;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;


@Data
class Tip {
    private LocalDateTime eventTime;
    private String participantName;
    private BigDecimal odds;
}