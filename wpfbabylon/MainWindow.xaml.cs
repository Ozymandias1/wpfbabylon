using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using MahApps.Metro.Controls;
using CefSharp;
using Microsoft.Win32;
using System.IO;

namespace wpfbabylon
{
    /// <summary>
    /// MainWindow.xaml에 대한 상호 작용 논리
    /// </summary>
    public partial class MainWindow : MetroWindow
    {
        public MainWindow()
        {
            InitializeComponent();

            // set target Frame rate to 60.0
            CefBrowser.BrowserSettings.WindowlessFrameRate = 60;
            CefBrowser.BrowserSettings.FileAccessFromFileUrls = CefState.Enabled;
            CefBrowser.BrowserSettings.UniversalAccessFromFileUrls = CefState.Enabled;
            // load page from disk
            CefBrowser.Address = string.Format("{0}WebResources\\index.html", AppDomain.CurrentDomain.BaseDirectory);
        }

        /// <summary>
        /// open cefsharp browser's dev tools
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void OnOpenDevTools(object sender, RoutedEventArgs e)
        {
            CefBrowser.ShowDevTools();
        }

        /// <summary>
        /// File-Quit Click Event
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void OnQuit(object sender, RoutedEventArgs e)
        {
            if( MessageBox.Show("Are you sure want to quit?", "Quit", MessageBoxButton.YesNo, MessageBoxImage.Question) == MessageBoxResult.Yes)
            {
                Application.Current.Shutdown();
            }
        }

        /// <summary>
        /// File-Load Obj click event
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void OnLoadObj(object sender, RoutedEventArgs e)
        {
            OpenFileDialog pDlg = new OpenFileDialog();
            pDlg.Filter = "Wavefront OBJ (*.obj)|*.obj";
            if( pDlg.ShowDialog() == true )
            {
                string fileFullPath = pDlg.FileName;

                string dirPath = System.IO.Path.GetDirectoryName(fileFullPath).Replace("\\", "/") + "/";
                string fileNameOnly = System.IO.Path.GetFileName(fileFullPath).Replace("\\", "/");

                string funcString = $"loadObj(\'{dirPath}\',\'{fileNameOnly}\')";
                CefBrowser.ExecuteScriptAsync(funcString);

                StatusBarText.Content = fileNameOnly;
            }
        }
    }
}
