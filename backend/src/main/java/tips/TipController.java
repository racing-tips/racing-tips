package tips;

import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.ArrayList;
import java.util.List;

@RestController
public class TipController {

    @RequestMapping(value = "/tips", method = RequestMethod.GET)
    public List<Tip> tips() {
        List<Tip> tipList = new ArrayList<>();
        tipList.add(new Tip());
        return tipList;
    }
}