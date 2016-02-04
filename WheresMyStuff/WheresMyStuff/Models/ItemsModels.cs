using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace WheresMyStuff.Models
{
    public class ItemsModels
    {
        [Key]
        public int Id { get; set; }
        
        public int ProfileModelsId { get; set; }
        [ForeignKey("ProfileModelsId")]
        public ProfileModels Profile { get; set; }
        //future dev: need to add AuthUsers Id & property here too

        [Required(ErrorMessage ="You must enter a name for the item")]
        public string ItemName { get; set; }
        public string ItemDesc { get; set; }
        public string ItemLocation { get; set; }
        public string ItemLabel { get; set; }
        [Required(ErrorMessage ="You must choose an owner for the product")]
        public string ItemOwner { get; set; }
        public string ItemPhoto { get; set; }
        public string ItemFilename { get; set; }

        //Use for soft-delete
        public bool isActive { get; set; }             

    }
}