using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DotNetLiguriaCore.Model
{
    public class WorkshopFeedbackModel
    {
        public Guid Id { get; set; }

        public required string Title { get; set; }
        public required string Location { get; set; }
        public required string Date { get; set; }    
        public required string Summary { get; set; }
        public required List<WorkshopTrackFeedbackModel> Tracks { get; set; }
    }
}
