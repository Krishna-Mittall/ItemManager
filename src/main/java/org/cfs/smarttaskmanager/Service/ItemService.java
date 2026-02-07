package org.cfs.smarttaskmanager.Service;

import org.cfs.smarttaskmanager.Entity.Item;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ItemService {

    List<Item> items = new ArrayList<>();
    Long idCount = 1L;

    public Item addItem(Item item){
        item.setId(idCount++);
        items.add(item);

        return item;
    }

    public Item getItemById(Long id) {

        for(Item i : items){
            if(i.getId().equals(id)){
                return i;
            }
        }

        throw new RuntimeException("Item Not Found with id: " + id);
    }
}
