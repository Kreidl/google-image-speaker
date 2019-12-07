using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SpeakerGateway.Modules

{
    /* 
     * Structure of returned Tags
     */

    public class DescriptionTag
    {
        public string TagType { get; set; }
        public string Description { get; set; }
        public double Percentage { get; set; }

    }
}
