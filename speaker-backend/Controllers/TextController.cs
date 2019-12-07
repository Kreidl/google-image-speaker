using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Web.Http.Cors;

namespace SpeakerGateway.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TextController : ControllerBase
    {

        // Get api/text/"string to get as .mp3"
        [HttpPost]
        public String Post([FromBody] Modules.Helper inTextToSpeechString)
        {
            
            if (inTextToSpeechString.Text.Length > 0)
            {
                return Modules.GoogleApiConnector.GetSpeech(inTextToSpeechString.Text);
            }
            return "";
        }

    }
}
