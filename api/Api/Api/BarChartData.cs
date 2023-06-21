using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api
{
    public class BarChartData
    {
        public List<AlphabetData> alphabetData { get; set; }
        

    }
    public class AlphabetData
    {
        public string Letter { get; set; }
        public double Frequency { get; set; }
    }

    
}
