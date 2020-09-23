package tips;

import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;



@RestController
public class TipController {

    @RequestMapping(value = "/tips", method = RequestMethod.GET)
    public List<Tip> tips() {
        List<Tip> tipList = new ArrayList<>();
        Tip tip = new Tip();
        tip.setEventTime(LocalDateTime.now());
        tip.setOdds(new BigDecimal(0.4));
        tip.setParticipantName("Paddington the Bear");
        tipList.add(tip);

        return tipList;
    }
}