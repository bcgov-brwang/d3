using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api
{
    public class PieChartData
    {
        public List<FrontendFrameworkData> frontendFrameworkData { get; set; }
        public List<BackendFrameworkData> backendFrameworkData { get; set; }

    }

    public class FrontendFrameworkData
    {
        public string Name { get; set; }
        public string Value { get; set; }
    }
    public class BackendFrameworkData
    {
        public string Name { get; set; }
        public string Value { get; set; }
    }

}
