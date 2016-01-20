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
        ////Created the list of temp seed items (to be replaced with a database!!)
        //static List<ItemsModels> _items = new List<ItemsModels>
        //{
        //    new ItemsModels {
        //        Id=1,
        //        ItemName= "Clock",
        //        ItemDesc= "Antique grandfather clock",
        //        ItemLocation= "Storage",
        //        ItemLabel= "Crate 01",
        //        ItemOwner= "Jane Doe",
        //        OwnerId=2,
        //        ItemPhoto= ""
        //        },
        //    new ItemsModels {
        //        Id=2,
        //        ItemName= "Garden tools",
        //        ItemDesc= "Small hand tools for gardening",
        //        ItemLocation= "Home - Garage",
        //        ItemLabel= "Box 02",
        //        ItemOwner= "John Doe",
        //        ItemPhoto= ""
        //    }
        //};

        private ApplicationDbContext _db = new ApplicationDbContext();

        //GET api/ItemsModels/allitems
        //Simple get function - fetch the list of items
        [HttpGet]
        public IHttpActionResult DisplayAllItems()
        {
            return Ok(_db.Items.ToList());
        }

        //GET api/ItemsModels/id
        //Simple get function - fetch a single item defined by its id
        [HttpGet]
        public IHttpActionResult DisplaySingleItem(int id)
        {
            //Find the item with the i.id matching id passed in
            var item = _db.Items.Find(id);
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
            if (ModelState.IsValid)
            {
                if (item.Id == 0)
                {
                    _db.Items.Add(item);
                    _db.SaveChanges();
                    return Ok();
                }
                else
                {
                    var original = _db.Items.Find(item.Id);
                    original.ItemDesc = item.ItemDesc;
                    original.ItemLabel = item.ItemLabel;
                    original.ItemLocation = item.ItemLocation;
                    original.ItemName = item.ItemName;
                    original.ItemOwner = item.ItemOwner;
                    original.ItemPhoto = item.ItemPhoto;
                    original.OwnerId = item.OwnerId;

                    _db.SaveChanges();
                    return Ok(item);
                }                
            }
            return BadRequest(ModelState);
        }

        [HttpDelete]
        public IHttpActionResult RemoveItem(int id)
        {
            //Locate the item in the database
            var original = _db.Items.Find(id);
            //stage the database code for removing the item
            _db.Items.Remove(original);
            //Update the database
            _db.SaveChanges();
            return Ok();
        }
    }
}
