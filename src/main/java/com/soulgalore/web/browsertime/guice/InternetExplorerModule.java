 /*******************************************************************************************************************************
 * It's Browser Time!
 * 
 *
 * Copyright (C) 2013 by Tobias Lidskog (https://twitter.com/tobiaslidskog) &  Peter Hedenskog (http://peterhedenskog.com)
 *
 ********************************************************************************************************************************
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in 
 * compliance with the License. You may obtain a copy of the License at
 * 
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is 
 * distributed  on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.   
 * See the License for the specific language governing permissions and limitations under the License.
 *
 ********************************************************************************************************************************
 */
package com.soulgalore.web.browsertime.guice;

import com.google.inject.AbstractModule;
import com.soulgalore.web.browsertime.datacollector.InternetExplorerDataCollector;
import com.soulgalore.web.browsertime.datacollector.TimingDataCollector;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.ie.InternetExplorerDriver;

/**
 * Setup a module that uses IE.
 */
public class InternetExplorerModule extends AbstractModule {

	@Override
	protected void configure()
	{
		bind(WebDriver.class).to(InternetExplorerDriver.class);
        bind(TimingDataCollector.class).to(InternetExplorerDataCollector.class);
	}
}