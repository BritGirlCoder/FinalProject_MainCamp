using WheresMyStuff.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace WheresMyStuff.Controllers.API
{
    public class ItemsModelsController : ApiController
    {
        //Created the list of temp seed items (to be replaced with a database!!)
        static List<ItemsModels> _items = new List<ItemsModels>
        {
            new ItemsModels {
                Id=1,
                ItemName= "Clock",
                ItemDesc= "Antique grandfather clock",
                ItemLocation= "Storage",
                ItemLabel= "Crate 01",
                ItemOwner= "Jane Doe",
                OwnerId=2,
                ItemPhoto= ""
                },
            new ItemsModels {
                Id=2,
                ItemName= "Garden tools",
                ItemDesc= "Small hand tools for gardening",
                ItemLocation= "Home - Garage",
                ItemLabel= "Box 02",
                ItemOwner= "John Doe",
                ItemPhoto= ""
            }
        };

        //GET api/ItemsModels/allitems
        //Simple get function - fetch the list of items
        [HttpGet]
        public IEnumerable<ItemsModels> DisplayAllItems()
        {
            return _items;
        }

        //GET api/ItemsModels/id
        //Simple get function - fetch a single item defined by its id
        [HttpGet]
        public IHttpActionResult DisplaySingleItem(int id)
        {
            //Find the item with the i.id matching id passed in
            var item = _items.Find(i => i.Id == id);
            //if there's no such item, return NotFound()
            if (item == null)
            {
                return NotFound();
            }
            //If the item is found, based on a matching id, return the item
            else
            {
                return Ok(item);
            }
        }

        //POST: api/ItemsModels
        //Post saves a product
        [HttpPost]
        public IHttpActionResult SaveItem(ItemsModels item)
        {
            _items.Add(item);
            //**THIS URL DOESN'T WORK
            return Created("/itemsTest/" + item.Id, item);
        }

        [HttpDelete]
        public IHttpActionResult RemoveItem(ItemsModels item)
        {
            //Remove the item from the collection and then send back the results.
            _items.Remove(item);

            //This approach may be required if you find that the first line in this sequence doesn't update the collection
            //properly by removing the item passed in from the UI and being supposely removed from the collection
            //First method may be problematic

            //ItemsModels itemToRemove = _items.Where(w => w.Id == item.Id).FirstOrDefault();
            //_items.Remove(itemToRemove);

            return Ok(_items);
        }
    }
}
