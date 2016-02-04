using WheresMyStuff.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Security.Claims;
using WheresMyStuff.Repositories;
using Microsoft.AspNet.Identity;

namespace WheresMyStuff.Controllers.API
{
    public class ItemsModelsController : ApiController
    {
        private IItemRepository _repo;
        private IAccountProfileRepository _repoAcct;

        public ItemsModelsController(IItemRepository repo, IAccountProfileRepository repoAcct)
        {
            _repo = repo;
            _repoAcct = repoAcct;
        }

        #region Get methods 
        //This gets all items for all profiles
        [Authorize]
        [HttpGet]
        public IHttpActionResult DisplayAllItems()
        {
            //if user is not an admin, they cannot run this function
            var user = User.Identity as ClaimsIdentity;
            if (!user.HasClaim("Admin", "true"))
            {
                return Unauthorized();
            }
         
            return Ok(_repo.ListItems());
        }

        //Get single item defined by its id
        [Authorize]
        [HttpGet]
        public IHttpActionResult DisplaySingleItem(int id)
        {
            var item = _repo.GetItemById(id);
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

        //Get items for a single profile by profile id
        [Route("api/ItemsModels/DisplayByProfile/{id}")]
        [HttpGet]
        public IHttpActionResult DisplayItemsByProfile(int id)
        {
            var items = _repo.GetItemsByAccount(id);
            //if no match, return NotFound()
            if (items == null)
            {
                return NotFound();
            }
            //If found, return item
            else
            {
                return Ok(items);
            }
        }

        //Get items by login
        [Route("api/ItemsModels/DisplayByUser/")]
        [HttpGet]
        public IHttpActionResult DisplayItemsByUser()
        {
            var userName = User.Identity.Name;
            var items = _repo.GetItemsByUser(userName);
            //if no match, return NotFound()
            if (items == null)
            {
                return NotFound();
            }
            //If found, return item
            else
            {
                return Ok(items);
            }
        }
        #endregion

        #region Create/Update
        //POST: api/ItemsModels
        //Post saves a product
        [HttpPost]
        public IHttpActionResult SaveItem(ItemsModels item)
        {
            if (ModelState.IsValid)
            {   
                if (item.Id == 0)
                {
                    item.Profile = null;
                    _repo.CreateItem(item);
                }
                else
                {
                    item.Profile = null;
                    _repo.UpdateItem(item);
                }
                return Ok();
            }
            return BadRequest(ModelState);
        }
        #endregion

        #region Hard Delete
        [HttpDelete]
        public IHttpActionResult RemoveItem(int id)
        {            
            _repo.DeleteItem(id);
            return Ok();
        }
        #endregion
    }
}
