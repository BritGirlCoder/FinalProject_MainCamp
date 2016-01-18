using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WheresMyStuff.Models
{
    public class ItemsModels
    {
        public int Id { get; set; }
        public string ItemName { get; set; }
        public string ItemDesc { get; set; }
        public string ItemLocation { get; set; }
        public string ItemLabel { get; set; }
        public string ItemOwner { get; set; }
        public string ItemPhoto { get; set; }
        public int OwnerId { get; set; }
    }
}